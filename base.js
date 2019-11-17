document.addEventListener('DOMContentLoaded', () => {
    search_result_template = document.querySelector('tbody.searchResults template');
    search_result_target   = document.querySelector('tbody.searchResults');
    comparison_table_body_template = document.querySelector('.popup table template');
    comparison_table_body_target   = document.querySelector('.popup table ');
    render(search_result_target, search_result_template, items);
});

function Soup(name, price, img, mass, meat, nuts, kcal, co) {
    return {
        name: name,
        price: price,
        img: img,
        mass: mass, // 'amount' would be more general, thus better?
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
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Chicken Noodle Soup", 10, "chicken-noodle.jpeg", 500,
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Chicken Noodle Soup", 14, "chicken-noodle-special.jpeg", 400,
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Chicken Rice Soup", 10, "chicken-rice.jpeg", 350,
         true, false,
         500,
         "CA"
        ),
    Soup("Consomme", 10, "consomme.jpeg", 400,
         true, false,
         500,
         "CA"
        ),
    Soup("Cream Chicken", 10, "cream-chicken.jpeg", 400,
         true, false,
         500,
         "CA"
        ),
    Soup("Cream Mushroom", 8, "cream-mushroom.jpeg", 300,
         true, false,
         500,
         "CA"
        ),
    Soup("Organic Carrot", 14, "organic-carrot-ginger.jpeg", 240,
         true, false,
         500,
         "CA"
        ),
    Soup("Campbell's Vegetable", 10, "vegetable.jpeg", 400,
         true, false,
         500,
         "CA"
        )
];


function show_comparison_popup(button_click_event) {
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
                console.log('here');
                checked_item_names.push(get_item_name(x));
                console.log(checked_item_names);
            }
        });
        return checked_item_names.map((x)=>{
            return items.find((y)=>{
                return y.name == x;
            });
        });
    }
    document.querySelector('.popup').style.visibility = "visible";
    console.log(get_comparison_data());
    render(comparison_table_body_target, comparison_table_body_template, {
        images: get_comparison_data(),
        names: get_comparison_data(),
        nutrition: get_comparison_data(),
        diet: get_comparison_data(),
    });
}
function hide_comparison_popup(button_click_event){
    document.querySelector('.popup').style.visibility = "hidden";
}
function expand_comparison_table(e){
    console.log(e);
    document.querySelector('.popup').style.width = "600";
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
function render(target, template, data) {
    function replace(a, b) {
        a.innerHTML = '';
        a.appendChild(b);
    }
    // console.log(template.parentElement);
    // console.log(data);
    // console.log(construct(template, data));
    replace(target, construct(template,data));
}



