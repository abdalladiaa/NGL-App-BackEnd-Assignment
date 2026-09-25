export default class BaseRepository{
    constructor( model){
        createDoc(data){
            return this.model.create(data)
        }
    }
}