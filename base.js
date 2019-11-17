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
    name: "Campbells Bean Bacon Soup",
    price: "$10",
    img: "bean-bacon.jpeg",
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
soups = [item1,item2,item3];
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
function log_type(data){
    console.log(typeof data);
}
function construct(template, data) {
    // var frag = new DocumentFragment();
    function interpret(template, data) {
        switch (typeof data) {
        case 'object':
            if (Array.isArray(data)) {
                console.log('constructing list!');
                return construct_list(template, data);
            } else {
                console.log('constructing object!');
                return construct_object(template, data);
            }
        case 'string': return data;
        case 'number': return data;
        default: return data;
        }
    }
    function construct_object(template, data) {
        var frag = document.importNode(template, true).content.firstElementChild;
        for (var key in data) {
            // console.log(key);
            switch (key) {
            case 'img':
                frag.querySelector('img').src = data[key];
                console.log(key);
            default:
                let chip = frag.querySelector('.' + key);
                if (chip) {chip.textContent = data[key];}
                // console.log(key);
            }
        }
        return frag;
    }
    function construct_list(template, data) {
        var frag = new DocumentFragment();
        for (let i = 0; i < data.length; i++) {
            frag.append(construct(template, data[i]));
        };
        return document.importNode(frag, true);
    }
    return interpret(template, data);
}
function render(template, data) {
    function replace(a, b) {
        a.innerHTML = '';
        a.appendChild(b);
    }
    console.log(template.parentElement);
    console.log(data);
    console.log(construct(template, data));
    replace(template.parentElement, construct(template,data));
}
document.addEventListener('DOMContentLoaded', () => {
    render(document.querySelector('tbody.searchResults template'), soups);
});
