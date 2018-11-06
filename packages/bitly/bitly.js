Bitly = {};

Bitly.shortenURL = function(url){
    if(!Meteor.settings.bitly)
    throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings');
    
    var shortenResponse = Meteor.http.get(
        "https://api-ssl.bitly.com/v3/shorten?",
        {
            timeout: 5000,
            params: {
                "format": 'json',
                "access_token": Meteor.settings.bitly,
                "longUrl": url
            }
        }
    );
    if(shortenResponse.statusCode === 200){
        return shortenResonse.data.data.url
    }else{
        throw new Meteor.Error(500, "Bitly call failed with error: "+shortenResponse.status_txt);
    }
}

Bitly.getClicks = (kink) => {
    if(!Meteor.settings.bitly)
    throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings');

    var statsResponse = Meteor.http.get(
        "https://api-ssl.bitly.com/v3/link/clicks?",
        {
            timeout: 5000,
            params: {
                "format": "json",
                "access_token": Meteor.settings.bitly,
                "link": link
            }
        }
    );
    if(statsResponse.data.status_code === 200)
        return statsResponse.data.data.link_clinks
}

Meteor.methods({
    'getBitlyClicks': (link) => {
        return Bitly.getClicks(link);
    }
})