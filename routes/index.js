var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM nyheder LIMIT 2`, function (err, nyheder) {
      db.query(`SELECT * FROM arrangementer LIMIT 2`, function (err, arrangementer) {
        db.query(`SELECT * FROM badpark WHERE type = "Brugt"`, function (err, badpark) {
          res.render('pages/index', { title: 'Om Klubben', badpark: badpark, arrangementer: arrangementer, footer: footer, nyheder: nyheder });
        })
      })
    })
  })
});

router.get('/nyheder', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM nyheder LIMIT 5`, function (err, nyheder) {
      res.render('pages/nyheder', { title: 'Nyheder', footer: footer, nyheder: nyheder });

    })
  })
});

router.get('/nyhederAlle', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM nyheder `, function (err, nyheder) {
      res.render('pages/nyhederAlle', { title: 'Ældre nyheder', footer: footer, nyheder: nyheder });

    })
  })
});

router.get('/arrangementer', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM arrangementer`, function (err, arrangementer) {
      res.render('pages/arrangementer', { title: 'Arrangementer', arrangementer: arrangementer, footer: footer });
    })
  })
});

router.get('/tilmeld', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    res.render('pages/tilmeld', { title: 'Tilmelding', footer: footer });
  })
});


router.get('/galleri', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM galleri`, function (err, galleri) {
      res.render('pages/galleri', { title: 'Galleri', galleri: galleri, footer: footer });
    })
  })
});
router.get('/galleri_kategori/:type', function (req, res, next) {
  console.log(req.params.type)
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * 
    FROM galleri_kategori
    WHERE type = ?
    `, [req.params.type], (err, galleri_kategori) => {
      console.log(galleri_kategori)
if (err) console.log(err); {
      res.render('pages/galleri_kategori', { title: 'Galleri kategori', galleri_kategori: galleri_kategori, footer: footer });
    }
    })
  })
});


router.get('/badpark', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT * FROM badpark`, function (err, badpark) {
      res.render('pages/badpark', { title: 'Bådpark', badpark:badpark, footer: footer });
    })
  })
});

router.get('/blivMedlem', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    db.query(`SELECT text1 FROM users`, function (err, text1) {
      res.render('pages/blivMedlem', { title: 'Blev Medlem', footer: footer, text1: text1 });
    })
  })
});

router.get('/minSide', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    res.render('pages/minSide', { title: 'Min Side', footer: footer });
  })
});

router.get('/login', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    res.render('pages/login', { title: 'Log ind', footer: footer });
  })
});

router.get('/kontakt', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    res.render('pages/kontakt', { title: 'Kontakt', footer: footer });
  })
});

router.get('/admin', function (req, res, next) {
  res.render('pages/admin', { title: 'Administration' })
});

module.exports = router;
