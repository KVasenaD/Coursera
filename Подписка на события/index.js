let db = [];
module.exports = {


    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
   on: function (event, subscriber, handler) {
        if(db[event] == undefined){
            db[event] = [];
        };
        db[event].push({
            subscriber: subscriber,
            handler: handler.bind(subscriber)
        })
        return this;
       
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
if(db[event] !== undefined){
    
    for (let i = db[event].length-1; i >= 0; i--) {
        if(db[event][i].subscriber == subscriber){
            
            db[event].splice(i,1);
            if(db[event].length === 0){
                delete db[event];
            }
            
            
        }
    }
}
    return this;    
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        
        if(db[event] !== undefined){
            for(let i = 0; i < db[event].length; i++){
                db[event][i].handler();
                
                 
            }

    }
        
     return this;    
}
    
}