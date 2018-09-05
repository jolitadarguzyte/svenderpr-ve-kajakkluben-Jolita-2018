var express = require('express');
const path = require("path")
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
      res.render('pages/badpark', { title: 'Bådpark', badpark: badpark, footer: footer });
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

router.get('/minSideLogin', function (req, res, next) {
  db.query(`SELECT * FROM footer`, function (err, footer) {
    res.render('pages/minSideLogin', { title: 'Min Side Log Ind', footer: footer });
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
  db.query(`SELECT * FROM arrangementer`, function (err, arrangementer) {
    res.render('pages/admin', { title: 'Administration', arrangementer: arrangementer })
  })
});



router.get('/adminNyheder', function (req, res, next) {
  db.query(`SELECT * FROM nyheder`, function (err, nyheder) {
    res.render('pages/adminNyheder', { title: 'adminNyheder', nyheder: nyheder })
  })
});

router.get('/adminGalleri', function (req, res, next) {
  db.query(`SELECT * FROM galleri`, function (err, galleri) {
    res.render('pages/adminGalleri', { title: 'adminGalleri', galleri: galleri })
  })
});

router.get('/adminBader', function (req, res, next) {
  db.query(`SELECT * FROM badpark`, function (err, badpark) {
    res.render('pages/adminBader', { title: 'adminBader', badpark: badpark })
  })
});
router.get('/adminMedlem', function (req, res, next) {
  db.query(`SELECT * FROM users`, function (err, users) {
    res.render('pages/adminMedlem', { title: 'adminMedlem', users: users })
  })
});


//cia postinam naujsu produktus admin puslapyje 
router.post('/opretprodukter', function (req, res, next) {
  console.log(req.body);
  console.log(req.files);
  let billede = req.files.url;
  if (billede == undefined) {
    res.json({
      'status': 400,
      'error': 'Billedet blev ikke modtaget.'
    });
  } else {
    // definer hvor billedet skal placeres, og hvilket navn det skal have
    // her burde der tjekkes om billede navnet allerede eksistere!
    let upload_location = path.join(__dirname, '..', 'public/images', billede.name);
    // benyt den express-fileuplod funktionen mv() til at flytte billedet
    console.log(req.body)
    db.query(`insert into badpark(foto, type, navn, sværhedsgrad, antal, pris)
  values (?,?,?,?,?,? )
               `, [billede.name, req.body.type, req.body.navn, req.body.sværgrad, req.body.antal, req.body.pris], (err, results) => {
        if (err) {
          console.log(err);
          // res.json({ message: "fejlede" })
        }
        else {
          // res.json({ message: "succes" })
          res.redirect("/adminbader")

        }

      })
    billede.mv(upload_location, (err) => {
      if (err) {
        console.log(err);
        // render() evt. siden med fejlbesked i stedet for send()
        // res.send(err);
      }
      // husk at skrive til DB
    });
  }
});

//redierinam idetu nauju produktu puslapi admino puslpyje
router.get('/produktinfo/:id', function (req, res, next) {
  db.query(`SELECT * FROM badpark WHERE id = ?`, [req.params.id], function (err, badpark) {
    res.send(badpark)
  })
});


//rendierinam redaguojamu produktu puslapi admino puslapyje
router.put("/redigerprodukt/:id", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  let billede = req.files.url;
  if (billede == undefined) {
    res.json({
      'status': 400,
      'error': 'Billedet blev ikke modtaget.'
    });
  } else {
    // definer hvor billedet skal placeres, og hvilket navn det skal have
    // her burde der tjekkes om billede navnet allerede eksistere!
    let upload_location = path.join(__dirname, '..', 'public/images', billede.name);
    // benyt den express-fileuplod funktionen mv() til at flytte billedet
    console.log(req.body)
    db.query(`UPDATE badpark set foto = ?, type = ?, navn = ?, sværhedsgrad = ?, antal = ?, pris = ?
    WHERE id = ?
               `, [billede.name, req.body.type, req.body.navn, req.body.sværgrad, req.body.antal, req.body.pris, req.params.id], (err, results) => {
        if (err) {
          console.log(err);
          // res.json({ message: "fejlede" })
        }
        else {
          // res.json({ message: "succes" })
          res.redirect("/adminbader")

        }

      })
    billede.mv(upload_location, (err) => {
      if (err) {
        console.log(err);
        // render() evt. siden med fejlbesked i stedet for send()
        // res.send(err);
      }
      // husk at skrive til DB
    });
  }
});

//rendierinam isstrintu produktu puslapi admino puslapyje
router.delete("/deletprodukt/:id", function (req, res) {
  db.query(`DELETE from badpark WHERE id =?`, [req.params.id], function (err, results) {
    if (err) {
      console.log(err);
      // res.json({ message: "fejlede" })
    }
    else {
      // res.json({ message: "succes" })
      res.redirect("/adminbader")

    }
  })
})


router.post('/login', function (req, res, next) {
  console.log(req.body)
  db.query(`SELECT navn , rettiheder
     FROM users
     where navn = ? 
     AND password = ?`, [req.body.user_name, req.body.password], (err, data) => {
      // cia surasem is DB Selesct user_name, rettiheder form users     

      // cia mes pasakome session kad issaugotu tuos kurie yra prisijunge
      // DB (med brugernavn), ir jis veikai kiekvienam useriui atskirai 
      
      if (err) {
        console.log(err);
      }
      // su if jei nieko nera - neleidizia prisijungti jeigu yra nunesa i admin puslapi 
      else {
        if (data.length) {
          req.session.username = data[0].navn;
          console.log(data);

          res.redirect('/admin');
          // cai pasakem kad zmones kurie turi rettiheder
          // prisijungima kaip tik prisijungia is karto tuoj 
          //nunestu i admin puslapi kur jie gali redaguoti sau reikiama info
          // else funkcijoj pasakem, jei zmones su paprastu loginu
          // juo tiesiai nunestu i puslapi skirta paprastiems vartotojams  
        }
        else {
          res.redirect("/login");
        }
      }
    })

});




module.exports = router;
