export declare global{
    interface Window{
        twttr?: {
            widgets: {
                load:(element?:any)=>any;
                destroy:(element?:any)=>any;
            }
        }
    }
}
// Need to figure out the types . Currently set to any(explicitly). 