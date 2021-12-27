export default class Tag {
    tag = "";
    color = 0;
    constructor(tag, color) {
        this.tag = tag;
        this.color = color;
    }
    changeColor(colorCount) {
        this.color = (this.color + 1) % colorCount;
    }
    changeTag(newTag) {
        this.tag = newTag;
    }
    static from(json){
        return Object.assign(new Tag(),json);
    }
}

export function newTags(tagSTR){
    let tagArr = tagSTR.split(/\s+/);
    let tags = [];
    tagArr.forEach(item =>{
        let index = tags.findIndex(curTag => curTag.tag === item);
        if(index === -1){
            tags.push(new Tag(item, 0));
        }
    });
    return tags;
}