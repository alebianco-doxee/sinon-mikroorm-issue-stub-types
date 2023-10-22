import {Entity, OptionalProps, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Item {
    [OptionalProps]?:'uuid';

    @PrimaryKey({columnType: 'uuid', defaultRaw: `gen_random_uuid()`})
    uuid!:string;

    @Property({length: 200})
    name!:string;
}
