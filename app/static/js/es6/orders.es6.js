/* jshint unused: false */
/* global main */

'use strict';

$(function()
{
  $('form.order').on('change', 'select.menu', getMenu);
  $('form.order').on('change', 'select.dish', updatePrice);
  $('form.order').on('click', 'button.remove', removeRow);
  $('form.order').on('input', 'input', updatePrice);
  $('#add').click(addRow);

  function updateTotal()
  {
    var total = 0;
    $('.price').each((i, priceDom)=>
    {
      var $price = $(priceDom);
      total += $price.text().replace(/[^\.\d]/g,'')*1;
    });

    $('.total').text('$'+total.toFixed(2));
  }

  function updatePrice()
  {
    var $row = $(this).parents('.menu-item');
    var $quantity = $row.find('.quantity');
    var quantity = $quantity.val().replace(/[^\d]/g,'')*1;
    quantity = main.clamp(quantity, 1, 999);
    $quantity.val(quantity);

    var price = $row.find('.dish > option:selected').data('cost') * 1;

    var total = (quantity * price);

    total = (total) ? total.toFixed(2) : '0.00';

    $row.find('.price').text('$'+total);

    updateTotal();
  }

  function removeRow(ev)
  {
    if($('.menu-item').length > 1)
    {
      var $row = $(this).parents('.menu-item');
      $row.remove();
    }

    updateTotal();

    ev.preventDefault();
  }

  function addRow(ev)
  {
    var $row = $('form.order .menu-items > .menu-item:first-child');
    var $menuItems = $('form.order .menu-items');
    $menuItems.append($row.clone());

    $menuItems.find('select.dish').trigger('change');

    ev.preventDefault();
  }

  function getMenu()
  {
    var $menuSelect = $(this);
    var menu = $menuSelect.val();

    main.ajax(`/dishes/${menu}`, 'GET', {}, h=>
    {
      var $dishSelect = $menuSelect.parents('.menu-item').find('select.dish');

      $dishSelect.html(h);

      $dishSelect.trigger('change');
    });
  }
});