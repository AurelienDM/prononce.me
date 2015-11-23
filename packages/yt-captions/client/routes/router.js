Router.map(function(){
    var self = this;

    this.route('ytCaptions', function(){
        this.render();
    }, {
        waitOn: function(){
            return Meteor.subscribe("captions", this.params.q);
        },
        data: function() {
            var _self = this;

            var highlightKeyword = function(doc) {
                doc.text = doc.text.replace(_self.params.q, "<strong>"+_self.params.q+"</strong>");
                return doc;
            };

            Session.set("currentQuery", _self.params.q);

            return {
                query: _self.params.q,
                captions: YT.Captions.find({}, {transform: highlightKeyword})
            };
        },
        path: '/pronounce/:q',
        layoutTemplate: 'ytLayout',
        template: 'ytVideoList',
        yieldTemplates: {
          'ytHeader': {to: 'header'},
          'ytFooter': {to: 'footer'}
        }
    });
});