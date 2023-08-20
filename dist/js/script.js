/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

const select = {
  templateOf: {
    menuProduct: "#template-menu-product",
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 0,
      defaultMax: 10,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };
//Constructor
  class Product{
    constructor(id, data){
      const thisProduct = this;

      this.id = id;
      this.data = data;


      thisProduct.renderInMenu();
      thisProduct.initAccordion();
    }
    renderInMenu(){
      const thisProduct = this;

      /* [DONE]generate HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);
      /*[DONE] create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      /*[DONE] find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);
      /*[DONE] add element to menu */
      menuContainer.appendChild(thisProduct.element);
    }
    initAccordion(){
      const thisProduct = this;

      /* [DONE]find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = this.element.querySelector(select.menuProduct.clickable);
      console.log("🚀 ~ file: script.js:83 ~ Product ~ initAccordion ~ clickableTrigger:", clickableTrigger)

      /*[DONE]START: add event listener to clickable trigger on event click */
      clickableTrigger.addEventListener('click', function(event) {
        /* prevent default action for event */
        event.preventDefault();
        /*[DONE] find active product (product that has active class) */
        const activeProduct = document.querySelector(select.all.menuProductsActive);
        console.log('ten produkt jest aktywny:', activeProduct)

        /* if there is active product and it's not thisProduct.element, remove class active from it */
        if (activeProduct != this.element ) {
        activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
        }
        /* toggle active class on thisProduct.element */
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      });

    }
  }

  //Methods
  const app = {
      initData: function(){
        const thisApp = this;


        thisApp.data = dataSource;
      },

      initMenu(){
        const thisApp = this;

        for (let productData in thisApp.data.products) {
          new Product(productData, thisApp.data.products[productData]);

        }
      },
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    }
  };


  app.init();
}
