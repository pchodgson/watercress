document.addEventListener('DOMContentLoaded', () => {
    comparison_table_body_template = document.querySelector('.popup table template');
    comparison_table_body_target   = document.querySelector('.popup table ');
    compare_table = RenderedElement(comparison_table_body_target,
                                    comparison_table_body_template,
                                    []);
    related_items_target = document.querySelector('ul.related-items');
    related_items_template = document.querySelector('ul.related-items template');
    // render(search_result_target, search_result_template, items);
    search_result_target = document.querySelector('tbody.searchResults');
    search_results = RenderedElement(search_result_target,
                                     search_result_target.querySelector('template'),
                                     items);
    search_results.render();

});

function Soup(name, price, img, mass, meat, nuts, kcal, co) {
    return {
        name: name,
        price: price,
        img: img,
        mass: mass,
        // dietary
        meat: meat,
        nuts: nuts,
        // nutrition
        kcal: kcal,
        country_of_origin: co
    };
}
items = [
    Soup("Cambells's Bean Bacon Soup", 10, "bean-bacon.jpeg", 400,
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Cheddar Cheese Soup", 10, "cheddar-cheese.jpeg", 400,
         false, false,
         500,
         "CA"
        ),
    Soup("Campbell's Chicken Noodle Soup", 10, "chicken-noodle.jpeg", 500,
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Chicken Noodle Special", 14, "chicken-noodle-special.jpeg", 800,
         true, false,
         900,
         "CA"
        ),
    Soup("Campbell's Chicken Rice Soup", 10, "chicken-rice.jpeg", 350,
         true, false,
         500,
         "USA"
        ),
    Soup("Consomme", 10, "consomme.jpeg", 400,
         true, false,
         500,
         "CA"
        ),
    Soup("Cream Chicken", 10, "cream-chicken.jpeg", 400,
         true, false,
         500,
         "USA"
        ),
    Soup("Cream Mushroom", 8, "cream-mushroom.jpeg", 300,
         false, false,
         500,
         "CA"
        ),
    Soup("Organic Carrot", 14, "organic-carrot-ginger.jpeg", 240,
         false, false,
         500,
         "CA"
        ),
    Soup("Campbell's Vegetable", 10, "vegetable.jpeg", 400,
         false, false,
         500,
         "USA"
        )
];

function get_item_name(row){
    console.log(row.querySelector('.name').innerHTML);
    return row.querySelector('.name').innerHTML;
}
function comparison_box_checked(row) {
    return row.querySelector('input[type=checkbox]').checked;
}
function get_comparison_data() {
    var checked_item_names = [];
    document.querySelectorAll('tbody.searchResults tr').forEach((x)=>{
        if (comparison_box_checked(x)) {
            checked_item_names.push(get_item_name(x));
        }
    });
    return checked_item_names.map((x)=>{
        return items.find((y)=>{
            return y.name == x;
        });
    });
}

function show_comparison_popup(button_click_event) {


    // console.log(get_comparison_data());
    if (get_comparison_data().length < 2) {return;}
    document.querySelector('.popup').style.visibility = "visible";
    render(related_items_target, related_items_template, items);
    // render(comparison_table_body_target, comparison_table_body_template, {
    //     images: get_comparison_data(),
    //     names: get_comparison_data(),
    //     nutrition: get_comparison_data(),
    //     diet: get_comparison_data(),
    // });
    compare_table.update((data)=>{return {
        images: get_comparison_data(),
        names: get_comparison_data(),
        nutrition: get_comparison_data(),
        diet: get_comparison_data(),
    };});
    compare_table.render();
}
function hide_comparison_popup(button_click_event) {
    document.querySelector('.popup').style.visibility = "hidden";
}

function register_item_name(event) {
    console.log(event.target.nextElementSibling.innerText);
    event.dataTransfer.setData('name', event.target.nextElementSibling.innerText);
}
function allowDrop(event){
    event.preventDefault();
}
// TODO refactor table update logic out of event handling logic
function add_to_comparison_items(item_name_drop_event) {
    console.log(item_name_drop_event.dataTransfer.getData('name'));
    let item = items.find((y)=>{
        return y.name == item_name_drop_event.dataTransfer.getData('name');
    });
    compare_table.update((data) => {
        // data.images.concat(item);
        // data.names.concat(item);
        // data.nutrition.concat(item);
        // data.diet.concat(item);
        return {
            images: data.images.concat(item),
            names: data.names.concat(item),
            nutrition: data.nutrition.concat(item),
            diet: data.diet.concat(item)
        };
    });
    compare_table.render();
}
function remove_from_comparison_items(item_name){
    function item_name_filter(item){
        return item.name != item_name;
    }
    compare_table.update((data)=>{
        return {
            images: data.images.filter(item_name_filter),
            names: data.names.filter(item_name_filter),
            nutrition: data.nutrition.filter(item_name_filter),
            diet: data.diet.filter(item_name_filter)
        };
    });
    compare_table.render();
}
// TODO button click event handler

function render(target, template, data) {
    function replace(a, b) {
        a.innerHTML = '';
        a.appendChild(b);
    }
    function construct(template, data) {
        // var frag = new DocumentFragment();
        function interpret(template, data) {
            switch (typeof data) {
            case 'object':
                if (Array.isArray(data)) {
                    // console.log('constructing list!');
                    return construct_list(template, data);
                } else {
                    // console.log('constructing object!');
                    return construct_object(template, data);
                }
            case 'string': return construct_object(template, {'string': data});
            case 'number': return construct_object(template, {'number': data});
            default: return data;
            }
        }
        function construct_object(template, data) {
            var frag = document.importNode(template, true).content.firstElementChild;
            var chip;
            for (var key in data) {
                // console.log(key);
                if (Array.isArray(data[key])){
                    chip = frag.querySelector('template.' + key);
                    console.log(chip);
                    console.log(construct_list(chip, data[key]));
                    chip.parentElement.replaceChild(construct_list(chip, data[key]), chip);
                }
                switch (key) {
                case 'img':
                    chip = frag.querySelector('img');
                    if (chip) {
                        chip.src = data[key];
                    }
                    break;
                case 'meat':
                    chip = frag.querySelector('.' + key);
                    if (chip) {chip.textContent = (data[key]) ? "Contains Meat" : "Vegetarian";}
                    break;
                case 'nuts':
                    console.log('here');
                    chip = frag.querySelector('.' + key);
                    if (chip) {chip.textContent = (data[key]) ? "Contains Nuts" : "Nut Free";}
                    break;
                default:
                    chip = frag.querySelector('.' + key);
                    if (chip) {chip.textContent = data[key];}
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
    replace(target, construct(template,data));
}
function RenderedElement(target, template, data) {
    function interpret(template, data) {
        switch (typeof data) {
        case 'object':
            if (Array.isArray(data)) {
                // console.log('constructing list!');
                return construct_list(template, data);
            } else {
                // console.log('constructing object!');
                return construct_object(template, data);
            }
        case 'string': return construct_object(template, {'string': data});
        case 'number': return construct_object(template, {'number': data});
        default: return data;
        }
    }
    function construct_object(template, data) {
        var frag = document.importNode(template, true).content.firstElementChild;
        var chip;
        for (var key in data) {
            // console.log(key);
            if (Array.isArray(data[key])){
                chip = frag.querySelector('template.' + key);
                console.log(chip);
                console.log(construct_list(chip, data[key]));
                chip.parentElement.replaceChild(construct_list(chip, data[key]), chip);
            }
            switch (key) {
            case 'img':
                chip = frag.querySelector('img');
                if (chip) {
                    chip.src = data[key];
                }
                break;
            case 'meat':
                chip = frag.querySelector('.' + key);
                if (chip) {chip.textContent = (data[key]) ? "Contains Meat" : "Vegetarian";}
                break;
            case 'nuts':
                console.log('here');
                chip = frag.querySelector('.' + key);
                if (chip) {chip.textContent = (data[key]) ? "Contains Nuts" : "Nut Free";}
                break;
            default:
                chip = frag.querySelector('.' + key);
                if (chip) {chip.textContent = data[key];}
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
    function construct(template, data) {
        // var frag = new DocumentFragment();
        return interpret(template, data);
    }
    function render(target, template, data) {
        function replace(a, b) {
            a.innerHTML = '';
            a.appendChild(b);
        }
        replace(target, construct(template,data));
    }
    function update(f){
        data = f(data);
    }
    return {
        render: () => {render(target, template, data);},
        update: update
    };
}
// TODO make commands chainable, e.g. update().render();

