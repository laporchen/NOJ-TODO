import Tag from "./tagClass"
export default class Task{
    name = "";
    date = "";
    tags = [];
    status ="";
    constructor(name,date,tags,status){
        this.name = name;
        this.date = date;
        this.status = status;
        /* tags.forEach(function(item, index, array){
            array[index] = Object.assign(new Tag(),item);
        });*/
        this.tags = tags;
    }
    static from(json){
        let returnObj = Object.assign(new Task(),json);
        returnObj.tags.forEach(function(item, index, array){
            array[index] = Object.assign(new Tag(),item);
        });
        return returnObj;
    }
    changeStatus(newStat){
        this.status = newStat;
    }
    changeDate(newDate){
        this.date = newDate;
    }
    changeName(newName){
        this.name = newName;
    }
    updateTag(newTags){
        let updatedTags = []

        newTags.forEach(tag =>{
            let index = this.tags.findIndex(function(item){
                return item.tag === tag.tag;
            });
            if(index === -1){
                updatedTags.push(new Tag(tag.tag,0));
            }   
            else{
                updatedTags.push(new Tag(tag.tag,this.tags[index].color));
            }
        })
        this.tags = updatedTags;
    }
}