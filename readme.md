#Charlie-Project

##Getting Started
Once you've extracted the tarball (which you will have to have done in order to be reading this), navigate to the project's root folder (which is the directory that contains this file) and `npm install`. This will install all of the project's dependencies. One dependency that cannot be installed directly through node is MongoDB; you'll have to install that yourself. Once you do, the project should work right out of the box. The reason I didn't put this on a public Version Control website like GitHub is because you had mentioned that certain elements of the project are between the two of us -- I didn't think it would be appropriate to allow this information to be shared publically.

##Current Development State
I quickly realized at the beginning of the project that a simple system of Google Sheets may suffice in the short term, but might fall short in the long term of achieving the goals we may set out in the future, such as adding features that Google Scripts and Google Sheets alone may not support. So, I decided to create a webapp, which would not only be able to accomplish the scheduling goals, but also serve as a template for accomplishing a wide variety of goals we have in the future with little to no modification of frontend code. I know this is an ambitious standard for flexibility, after having built this webapp, I think it's a realistic standard as well. 

The project has a powerful user model and teacher-student access system. Passwords are stored in a hashed form (salted hashes are a future development goal). I have written backend methods for `createActivity();` and `registerForActivity()`, which take as arguments an initial time, as well as a duration. This is an example of the extensibility aspect of this webapp. For your current flex time needs, a duration is not necessary (since it is assumed to be during flex time). But once other times come in (such as callback), time and duration become an important aspect of scheduling. What I'm working on right now is integrating these backend methods with database queries. Once I have finished stitching those two together, the initial development for the webapp will be finished.

You probably will notice that the frontend is a bit rough around the edges, but that's because I've given most of my thought to setting up a robust and secure backend. There is some development left to do with the user model (for example, adding the option for password recovery) but the project is nearing completion.

Feel free to let me know what you think!

All the best, 

Milo
