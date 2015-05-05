/**
 * Created by George on 4/14/2015.
 */
exports.index = function(req,res){

    res.render('sysadmin/index',{
        title: 'System Administration'
    });

}