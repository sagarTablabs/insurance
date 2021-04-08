export class Common {
    public static onlyAlphabetRegex = "^[a-zA-Z,.!? ]*$"
    public static phoneNumberRegex = "^[2-9][0-9]{9}$"
    public static addressRegex = "^[^*%]*$"
    public static passwordRegex = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!(@)-_#$%^&+=]).*$"
    public static pincodeRegex = "^(?=[0-9]*$)(?:.{4}|.{6})$"
    public static numberRegex = "^[0-9]+$"
}