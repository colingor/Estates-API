module.exports = function(app) {

    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var debug= require('debug')('boot:script');

    User.create([
            {username: 'Colin', email: 'colin.gormley@ed.ac.uk', password: 'opensesame'},
            {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
            {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
            ], function(err, users) {
                if (err) return debug('%j', err);
                // Create projects, assign project owners and project team members
                // Create the admin role
                Role.create({
                    name: 'admin'
                }, function(err, role) {
                    if (err) return debug(err);
                    debug(role);

                    // Make Colin an admin
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    }, function(err, principal) {
                        if (err) return debug(err);
                        debug(principal);
                    });
                });
            });
};
