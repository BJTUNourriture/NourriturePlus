var Shops = require('../models/shops');

exports.getShopsLocation = function(req, res) {
	return (res.json(202,
    [{
      title: 'Bingzhi Xinshui Shop',
      desription: 'Shops',
      lat: 39.9484801,
      lng: 116.343724
    },
    {
      title: 'Yongzhenge',
      description: 'Shops and malls',
      lat: 39.9554,
      lng: 116.3470412
    },
    {
      title: 'Peach Buwu',
      description: 'Shops and malls',
      lat: 39.9577458,
      lng: 116.3416253
    },
    {
      title: 'Zaosan Non-Staple Food Store',
      description: 'Shops',
      lat: 39.9576801,
      lng: 116.3365648
    },
    {
      title: 'Beijing Wine & Cigarette Franchise',
      description: 'Wine and cigarette',
      lat: 39.9565189,
      lng: 116.3355738
    },
    {
      title: '7-Eleven',
      description: 'Grocery store',
      lat: 39.9546674,
      lng: 116.3358901
    },
    {
      title: 'Fruitime',
      description: 'Icecream store',
      lat: 39.9526887,
      lng: 116.3363052
    },
    {
      title: 'Gangyan Lvjieshui Station',
      description: 'Shops and malls',
      lat: 39.9500341,
      lng: 116.3365332
    },
    {
      title: 'Kangtai Jixiang Complex Shop',
      description: 'Grocery store',
      lat: 39.948272,
      lng: 116.3393307
    }]
  ));
};
