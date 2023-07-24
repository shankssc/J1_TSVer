const FactoryGirl = require('factory-girl');
import { Model, Document } from 'mongoose';

/**
 * Adapters provide support for different databases and ORMs.
 * Adapters can be registered for any specific model or a default adapter can be assigned
 */

export class MongooseAdapter extends FactoryGirl.MongooseAdapter() {
    async build<T extends Document>(Model: Model<T>, props: any): Promise<T> {
        return new Model(props);
    }
    
    async save<T extends Document>(doc: T): Promise<T> {
        return doc.save();
      }
    
    /*
    async destroy<T extends Document>(Model: Model<T>, conditions: any): Promise<number> {
        const deleteResult: DeleteResult = await Model.deleteOne(conditions).exec();
        return deleteResult.deletedCount ?? 0;
    }
    */
}
