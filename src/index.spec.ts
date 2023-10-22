import tap from 'tap'
import {MikroORM} from "@mikro-orm/core";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Item} from "./entities/item";


let mikro:MikroORM<PostgreSqlDriver>

const expected:Item = {
    uuid: "554b86f7-7da9-485a-a826-e0fd5176ad4f",
    name: "foo"
}

tap.beforeEach(async () => {
    mikro = await MikroORM.init({
        driver: PostgreSqlDriver,
        metadataProvider: TsMorphMetadataProvider,
        entities: [Item],
        dbName: 'test',
        debug: true,
    });
})

tap.afterEach((test) => {
    test.sinon.restore();
})

tap.test("successful stubbing the create method by argument", async (test) => {
    test.sinon.stub(mikro.em, 'create').withArgs(Item).returns(expected);
    const result = mikro.em.create(Item, { name: "something else" });
    test.same(result, expected)
})

tap.test("successful stubbing the find method", async (test) => {
    test.sinon.stub(mikro.em, 'find').resolves([expected]);
    const result = await mikro.em.find(Item, { name: "something else" });
    test.same(result, [expected])
})

tap.test("successful stubbing the find method by call order", async (test) => {
    test.sinon.stub(mikro.em, 'find').onCall(0).resolves([expected]);
    const result = await mikro.em.find(Item, {name: "something else"});
    test.same(result, [expected])
})

tap.test("typescript error when stubbing the find method by argument", async (test) => {
    test.sinon.stub(mikro.em, 'find').withArgs(Item).resolves([expected]);
    // ^ should give tsc error 'TS2589: Type instantiation is excessively deep and possibly infinite.'
    // ^ can be ignored with @ts-ignore
    const result = await mikro.em.find(Item, {name: "something else"});
    test.same(result, [expected])
})
