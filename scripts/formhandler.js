(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var strengthLabel = $('label[for="strengthLevel"]');

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function changeStrengthLevel(elementName, colorValue) {
    switch (true) {
      case (colorValue >= 0 && colorValue <= 33):
        {
          elementName.css('color', 'green');
          break;
        }
      case (colorValue >= 34 && colorValue <= 67):
        {
          elementName.css('color', 'orange');
          break;
        }
      case (colorValue >= 68 && colorValue <= 100):
        {
          elementName.css('color', 'red');
          break;
        }
    }
    elementName.text("Caffeine Rating: " + colorValue);
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data)
      .then(function() {
        this.reset();
        changeStrengthLevel(strengthLabel, $('#strengthLevel').prop('value'));
        this.elements[0].focus();
      }.bind(this));
    });
  };

  FormHandler.prototype.addInputHandler = function(fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addRangeHandler = function() {
    console.log('Setting range handler for form');
    changeStrengthLevel(strengthLabel, $('#strengthLevel').prop('value'));
    strengthLabel.text("Caffeine Rating: " + $('#strengthLevel').prop('value'));
    this.$formElement.change('value', function(event) {
      event.preventDefault();
      changeStrengthLevel(strengthLabel, $('#strengthLevel').prop('value'));
    }.bind(this));
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
