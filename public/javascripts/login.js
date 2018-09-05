const sql_connection = require("../config/sql.js").connect();

module.exports = (app) => {

    app.post("/login", (req, res) => {
        var sess = req.session;

        var post = req.body;
        var name = post.brugernavn;
        var pass = post.password;
        sql_connection.query(`SELECT navn , rettiheder
         FROM users
         where navn = ? 
         AND password = ?`, [name, pass], (err, data) => {
                // cia surasem is DB Selesct user_name, rettiheder form users     

                if (err) {
                    console.log(err);
                }
                else {
                    if (data.length) {
                        console.log(data);
                        req.session.rights = data[0].rettiheder;
                        if (req.session.rights == 1) {

                            res.redirect('/admin');
                        }
                        if (req.session.rights == 2) {

                            res.redirect('/kontakt');
                        }
                        if (req.session.rights == 3) {

                            res.redirect('/minSideLogin');
                        }
                        // cai pasakem kad zmones kurie turi rettiheder
                        // prisijungima kaip tik prisijungia is karto tuoj 
                        //nunestu i admin puslapi kur jie gali redaguoti sau reikiama info
                        else {
                            res.redirect('/');
                        }
                        // else funkcijoj pasakem, jei zmones su paprastu loginu
                        // juo tiesiai nunestu i puslapi skirta paprastiems vartotojams  
                    }
                    else {
                        res.redirect("/login");
                    }
                }
            })
        log_module.activityLog(req.connection.remoteAddress + " /index");
    })

    // cia padarem logout is amin puslapio ir pasakem kad islogindami tiesiai nunestu i index puslapi 
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });
}