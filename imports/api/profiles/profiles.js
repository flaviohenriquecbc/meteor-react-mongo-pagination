import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection('profiles');

ProfileSchema = new SimpleSchema({
  studyField: {
    type: String,
    label: "Study Field",
    regEx: /^s[1-7]$/
  },
  startDate: {
    type: Date,
    label: "Start Date"
  },
  name: {
    type: String,
    label: "Name",
    max: 50
  }
});


//retrieve the profiles using the filters
function getQuery(filters){
  let query = {};

  //get all parameters from filters and apply
  for(let filter in filters){
    if(filters[filter].length > 0){

        //if type of filter is startMonth, treat it differently
        if(filter == 'startMonth'){
          let initialMonth = moment(filters[filter], "MMM YYYY").date(1);
          let nextMonth = initialMonth.clone().add(1, 'months');
          query['startDate'] = {
            $gte: initialMonth.toDate(),
            $lt: nextMonth.toDate()
          };
        }else{//otherwise filter
          query[filter] = {
            $in: filters[filter]
          };
        }
    }
  }
  return query;
}

if (Meteor.isServer) {

  //publish profiles
  Meteor.publish("profiles", (filters, skip, limit) => {
    let query = getQuery(filters);
    return Profiles.find(query, {skip: skip, limit: limit});//[1,2,3]//
  });

  //methods to get some data
  Meteor.methods({
    //get the total of profiles on the database
    'profiles.getTotal'() {
      return Profiles.find().count();
    },
    //get the total of profiles after applying the filters
    'profiles.getTotalFiltered'(filters) {
      let query = getQuery(filters);
      return Profiles.find(query).count();
    }
  });

  //load database
  if (!Profiles.find().count()) {
	  for (let i = 1; i <= 1000; i++) {

      //create random values
      let randomField = Math.floor((Math.random() * 10) % 7 + 1);//1 - 7
      let randomDay = Math.floor((Math.random() * 100) % 31);//0 - 30
      let randomMonth = Math.floor((Math.random() * 100) % 13);//0 - 12

      let obj = {
			  name: ('Profile #' + i),
        studyField: 's' + randomField,
        startDate: moment().add(randomDay, 'days').add(randomMonth, 'months').toDate()
		  };

      //add just if the object follows its schema
      if(Match.test(obj, ProfileSchema)){
          Profiles.insert(obj);
      }else{
        throw "Tried to create an invalid object."
      }
	  }
  }

}
