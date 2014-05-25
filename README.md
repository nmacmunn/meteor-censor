# meteor-censor

Offers an easy way to denormalize published documents, as described in the excellent article [Reactive Joins in Meteor](https://www.discovermeteor.com/blog/reactive-joins-in-meteor/)

### Usage
Works the same as `Meteor.publish`, except the transform option is respected (if provided).

```javascript
Meteor.censor(name, func);
```

### Example
Return a set of user docs joined with the corresponding users' avatars.

```javascript
Meteor.censor("users", function () {
  return Meteor.users.find({}, {
    transform: function (user) {
      user.avatar = images.findOne({owner: user._id});
      return user;
    }
  });
});
```
