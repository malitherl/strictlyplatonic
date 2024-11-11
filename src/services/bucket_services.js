import { createClient } from '@supabase/supabase-js'

//These handle all interactions with our storage bucket, hosted on supabase. 

// Create a single supabase client for interacting with your database

class Bucket {

    supabase;

    constructor() {
        //Constructor initializes supabase
        this.supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
    }


     
    async uploadUserAvatar (filePath, file) {

        /**
         * To access our images in the storage bucket, we must use a specific URL to do so and return these URLs once images are uploaded to the database.
         * The reason why this is, is because we must store these URLs in our user-management database. The Supabase SDK will generate these URLs for us. 
         * 
         * 
         * PARAMETER: 
         * 
         * filePath: the filePath is a string that has been retrieved from the user_metadata, stored elsewhere.  
         * 
         * file: the file is the image itself, either in png, gif, or jpg format. 
         */
        
        //first try-catch to upload image 
        try {
            const userAvatar = await this.supabase.storage.from('avatars').upload(filePath, file, {
                contentType: 'image/jpeg',
            });
            console.log("Success! Avatar updated!");
        } catch (error) {
            console.log(error);  
        }

        //second try-catch to generate url to access the image in storage
        try {

            const { data } = this.supabase.storage.from('avatars').getPublicUrl(filePath);
            
            console.log(data.publicUrl);
            return data.publicUrl;
        
        } catch (error) {

            console.log(error);  
        
        }


    }



}





