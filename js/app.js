(function () {
  const list = document.getElementById("list");
  //check fields and hide submit
  document.addEventListener('DOMContentLoaded', function () {
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
  })
  //add customer on submit
  document.getElementById('customer-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = this.querySelector('.name');
    const course = this.querySelector('.course');
    const author = this.querySelector('.author');

    const customer = new Customer(name.value, course.value, author.value)
    // console.log(customer);

    const display = new Display();

    display.feedback(customer);
    display.clearFields();
  });
  //delete
  list.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('delete-flashcard')) {
      // console.log(event.target.parentElement.parentElement);
      list.removeChild(event.target.parentElement.parentElement);
    }
  })
  //display
  function Display() {
    this.name = document.getElementById("name");
    this.course = document.getElementById("course");
    this.author = document.getElementById("author");
    this.customers = document.querySelector(".customer-list");
  }
  //check fields
  Display.prototype.checkFields = function () {
    // console.log(this);
    this.name.addEventListener('blur', this.validateField);
    this.course.addEventListener('blur', this.validateField);
    this.author.addEventListener('blur', this.validateField);
  };
  //validate each fields
  Display.prototype.validateField = function () {
    // console.log(this);
    if (this.value === '') {
      this.classList.remove("complete");
      this.classList.add("fail");
    } else {
      this.classList.add("complete");
      this.classList.remove("fail");
    }
    const complete = document.querySelectorAll(".complete");
    if (complete.length === 3) {
      document.querySelector(".submitBtn").disabled = false;
    } else {
      document.querySelector(".submitBtn").disabled = true;

    }
  };
  //disable submit
  Display.prototype.hideSubmit = function () {
    const btn = document.querySelector(".submitBtn");
    btn.disabled = true;
  };
  Display.prototype.clearFields = function () {
    // console.log(this);

    this.name.value = '';
    this.course.value = '';
    this.author.value = '';

    this.name.classList.remove('complete', 'fail');
    this.course.classList.remove('complete', 'fail');
    this.author.classList.remove('complete', 'fail');
  };
  //show loading and feedback
  Display.prototype.feedback = function (customer) {
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');
    feedback.classList.add('showItem', 'alert', 'alert-success');
    loading.classList.add('showItem');

    const self = this;
    self.hideSubmit();
    setTimeout(function () {
      feedback.classList.remove('showItem', 'alert', 'alert-success');
      loading.classList.remove('showItem');
      self.addCustomer(customer)
    }, 4000)
  };
  Display.prototype.addCustomer = function (customer) {
    // console.log(customer.name);

    const random = this.getRandom();
    const div = document.createElement('div');
    div.classList.add("col-11", "mx-auto", "col-md-6", "col-lg-4", "my-3");
    div.innerHTML = `
    <div class="card text-left">
       <img src="img/cust-${random}.jpg" class="card-img-top" alt="">
       <div class="card-body">
        <!-- customer name -->
        <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${customer.name}</span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
        ${customer.course}
         </span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author"> ${customer.author}</span></h6>
        <!-- end of customer name -->
       </div>
      </div>
      <div class="flashcard-btn d-flex justify-content-between">

        <a href="#" id="edit-flashcard" class=" btn my-1 btn-success edit-flashcard text-uppercase" data-id="">edit</a>
        <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
       </div>
    `;
    this.customers.appendChild(div);
  };
  //random number
  Display.prototype.getRandom = function () {
    let random = Math.floor(Math.random() * 5 + 1);
    return random;
  };
  //customer constructor
  function Customer(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
  }
})();