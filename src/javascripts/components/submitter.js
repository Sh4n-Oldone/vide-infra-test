import $ from 'jquery';
import 'jquery-validation';

$(() => {
  $.validator.addMethod("phoneNumber", function(value, element) {
    return this.optional(element) || /^\+\d{4,}$/.test(value);
  }, $("#phoneErrorMessage").text());

  // "Validation messages must not be hardcoded inside the .js files"
  // i have no idea what it is supposed to mean
  // if it is not hardcoded in the .js file, it is hardcoded in the .html file
  // if it server's side rendered, it is hardcoded in the .html file, but in this case form is not validated on client side with this plugin

  const inputs = $(".form__group").find("input, textarea");

  const inputsData = inputs.map((index, input) => {
    const name = $(input).attr("name");
    const errorMessage = $(`#${name}-error`).text();
    const type = $(input).attr("type");
    const required = $(input).attr("required");

    return {
      name,
      errorMessage,
      type,
      required,
     }
  });

  const rulesObj = {};

  inputsData.each((_, input) => {
    rulesObj[input.name] = {
      required: input.required === 'required',
      phoneNumber: input.type === 'tel'
    }
  }
  );

  const messagesObj = {};

  inputsData.each((_, input) => {
    messagesObj[input.name] = {
      required: input.errorMessage,
      phoneNumber: input.errorMessage
    }
  }
  );

  $(".form__body").validate({
    // generated
    // rules: rulesObj,
    // messages: messagesObj,
    // local
    rules: {
      phonefield1: {
        required: true,
        phoneNumber: true
      },
      phonefield2: {
        required: true,
        phoneNumber: true
      },
      text: {
        required: true
      }
    },
    messages: {
      phonefield1: {
        phoneNumber: 'Please enter a valid phone number.'
      },
      phonefield2: {
        phoneNumber: 'Please enter a valid phone number.'
      },
      text: {
        required: 'Please enter a message.'
      }
    },
  });
});

$(() => {
  $("form").on("submit", (event) => {
    event.preventDefault();

    const isValid = $("form").valid();

    if (isValid) {
      $(".section__form").addClass("fade-out-text");
      // $(".section__form").addClass("fade-out-text");
    }
  });
});