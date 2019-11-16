class Item {
    constructor(name, price, img){
        this.name = name;
        this.price = price;
        this.img = img;
    }
    // getPK(name, listItem) {
    //     document.
    // }
    // find(name, list) {
    // }
}
class Soup {
    constructor(name, price, img, mass, veg, nuts, kcal, co) {
        Item.call(this, name, price, img);
        this.mass = mass;
        // dietary // is it worth spliting the difference of vegetarian and vegan?
        this.veg = veg;
        this.nuts = nuts;
        this.kcal = kcal;
        this.co = co; // country_of_origin;
    }
}
item1 = {
    name: "Tomato Soup",
    price: "$10",
    mass: "400g",
    CountryofOrigin: "CA",
    vegetarian: true
};
item2 = {
    name: "Beef Soup",
    price: "$14",
    mass: "400g",
    CountryofOrigin: "CA",
    vegetarian: false
};
item3 = {
    name: "Corn Soup",
    price: "$7",
    mass: "250g",
    CountryofOrigin: "US",
    vegetarian: false
};
items = [item1,item2,item3];
function show_comparison_popup(button_click_event){
    document.querySelector('.popup').style.visibility = "visible";
}
function hide_comparison_popup(button_click_event){
    document.querySelector('.popup').style.visibility = "hidden";
}
function expand_comparison_table(e){
    console.log(e);
    document.querySelector('.popup').style.width = "600";
}
function construct(template, data) {
    var frag = document.importNode(template, true).content.firstElementChild;
    function interpret(data) {
        switch (typeof data) {
        case 'object':
            if (Array.isArray(data)){
                frag
            } else {
                for (var key in data) {
                    let element = template.querySelector('.' + key);
                }
                console.log('TODO object');}
        case 'string': console.log('TODO string');
        case 'number': console.log('TODO number');
        }
    }
    function construct_list(template, data) {
        var frag = new DocumentFragment();
        for (let i = 0; i < data.length; i++) {
            frag.append(construct(template, data[i]));
        };
    }
    function construct_table(template, data) {
        
    }
    return document.importNode(frag, true);
}
function render(template, data) {
    console.log(template);
    console.log(data);
}
document.addEventListener('DOMContentLoaded', () => {
    let x = document.querySelectorAll('template');
    console.log(x);
});
