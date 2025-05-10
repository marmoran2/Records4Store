// Render a product card from data using the template
function renderProductCard(data) {
    let tpl = $('#productCardTpl').html();
    for (const key in data) {
      const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      tpl = tpl.replace(re, data[key]);
    }
    return tpl;
  }