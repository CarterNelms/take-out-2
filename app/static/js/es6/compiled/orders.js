'use strict';
$(function() {
  $('form.order').on('change', 'select.menu', getMenu);
  $('form.order').on('change', 'select.dish', updateProperties);
  $('form.order').on('click', 'button.remove', removeRow);
  $('form.order').on('input', 'input', updateProperties);
  $('#add').click(addRow);
  function updateTotal() {
    var total = 0;
    $('.price').each((function(i, priceDom) {
      var $price = $(priceDom);
      total += $price.text().replace(/[^\.\d]/g, '') * 1;
    }));
    $('.total').text('$' + total.toFixed(2));
  }
  function updateProperties() {
    var $row = $(this).parents('.menu-item');
    var $quantity = $row.find('.quantity');
    var quantity = $quantity.val().replace(/[^\d]/g, '');
    quantity = main.clamp(quantity, 0, 999);
    quantity = (quantity) ? quantity * 1 : '';
    $quantity.val(quantity);
    var price = $row.find('.dish > option:selected').data('cost') * 1;
    var calories = $row.find('.dish > option:selected').data('calories') * 1;
    var totalPrice = (quantity * price);
    var totalCalories = (quantity * calories);
    totalPrice = (totalPrice) ? totalPrice.toFixed(2) : '0.00';
    totalCalories = (totalCalories) ? totalCalories.toFixed() : '0';
    $row.find('.price').text('$' + totalPrice);
    $row.find('.calories').text(totalCalories + ' cal');
    updateTotal();
  }
  function removeRow(ev) {
    if ($('.menu-item').length > 1) {
      var $row = $(this).parents('.menu-item');
      $row.remove();
    }
    updateTotal();
    ev.preventDefault();
  }
  function addRow(ev) {
    var $row = $('form.order .menu-items > .menu-item:first-child').clone();
    $row.find('.quantity').val(1);
    var $menuItems = $('form.order .menu-items');
    $menuItems.append($row);
    $menuItems.find('select.dish').trigger('change');
    ev.preventDefault();
  }
  function getMenu() {
    var $menuSelect = $(this);
    var menu = $menuSelect.val();
    main.ajax(("/dishes/" + menu), 'GET', {}, (function(h) {
      var $dishSelect = $menuSelect.parents('.menu-item').find('select.dish');
      $dishSelect.html(h);
      $dishSelect.trigger('change');
    }));
  }
});

//# sourceMappingURL=orders.map
