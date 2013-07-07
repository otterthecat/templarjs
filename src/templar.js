(function(){

  var _parsing_regx = /[a-zA-Z0-9-_]+/g

  var _run_template = function(element, data_obj){

    // make array of name/value pairs from templar data attribute
    var value_array = element.getAttribute('data-templar').split(',');

    // loop through the pairs
    for(var n = 0; n < value_array.length; n += 1){

      // use regex to make new array with 2 elements -
      // [0] element property key, and [1] property of data_obj
      key_value_array = value_array[n].match(_parsing_regx);

      // if we don't get 2 elements back, then (for now)
      // assume that only a property of the data_obj is requested,
      // this is a signal to loop through that property's array value
      if(key_value_array.length > 1){

        if(element[key_value_array[0]] !== undefined){

          element[key_value_array[0]] = data_obj[key_value_array[1]];
        }
      // we have an array
      // TODO this block definitely needs some lovin'
      } else if(typeof data_obj[key_value_array[0]] === 'object'){

        // get child elements of the original template element
        child_elements = element.children;

        // store the data_obj array in a new variable
        // helps prevent looping scope errors
        var loop_data = data_obj[key_value_array[0]];

        // each item of the array  applies itself to
        // a cloned child node template
        for(var i = 0; i < loop_data.length; i += 1){

          // note that cloneNode()'s 'deep' argument is required for all browsers other than firefox
          // hence it being set to "true" here
          var clone = child_elements[i].cloneNode(true);

          var clone_children = Array.prototype.slice.call(clone.querySelectorAll('[data-templar]'));

          for(var n = 0; n < clone_children.length; n += 1){

              _run_template(clone_children[n], loop_data[i]);

              // clone_children[0] will append the original parent element
              // if there's more than 1 nested element (ie more than 1 array element)
              // then append the previous child within the parent
              if(n > 0){

                clone_children[n-1].appendChild(clone_children[n]);
              } else {

                clone.appendChild(clone_children[n]);
              }
          }

          _run_template(clone, loop_data[i]);

          element.appendChild(clone);
        }

        // clean up template by removing the original child,
        // as it was only used to make clones, and thus never updated direcltly
        element.removeChild(child_elements[0]);
      }
    }

  };

  var tpl = new Function();

  tpl.prototype = {

      exec: function(data_obj){

          var templates = Array.prototype.slice.call(document.querySelectorAll('[data-templar]'));

          for(var i = 0; i < templates.length; i += 1){

              _run_template(templates[i], data_obj);
          }
      }
  };

  window.Templar = tpl;
}());