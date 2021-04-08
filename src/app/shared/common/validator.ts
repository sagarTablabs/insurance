export class common {
    public static onlyAlphabetRegex = "^[a-zA-Z,.!? ]*$"
    public static phoneNumberRegex = "^[2-9][0-9]{9}$"
    public static panNoRegex = "^[A-Z]{5}[0-9]{3,4}[A-Z]{1}"
    public static addressRegex = "^[^*%]*$"
    public static aadharRegex = "^[0-9]{12}"
    public static licence = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
    public static onlyNumbers = "^[0-9]*$"
}