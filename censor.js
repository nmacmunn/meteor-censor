var startObserving = function (cursor) {

    var subscription = this;
    var collection_name = cursor._getCollectionName();

    var callback = function (_id) {
        var doc = cursor._mongo.findOne(collection_name, _id);
        var transform = cursor.getTransform();
        var transformed = transform ? transform.call(subscription, doc) : doc;

        subscription.added(collection_name, _id, transformed);
    };

    var observe_handle = cursor.observeChanges({
        added: callback,
        changed: callback,
        removed: function (_id) {
            subscription.removed(collection_name, _id);
        }
    });

    subscription.onStop(function () {
        observe_handle.stop();
    });
};

censor = function (name, handler) {

    Meteor.publish(name, function () {

        var cursors = handler.apply(this, arguments);

        if (!_.isArray(cursors)) {
            cursors = [cursors];
        }

        _.each(cursors, function (cursor) {
            if (cursor) startObserving.call(this, cursor);
        }, this);

        this.ready();
    });

};

Meteor.censor = censor;