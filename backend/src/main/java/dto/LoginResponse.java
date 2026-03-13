package dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private int id;

    public LoginResponse(boolean success, String message,int id) {
        this.success = success;
        this.message = message;
        this.id = id;
    }
    public boolean isSuccess() {
        return success;
    }
    public String getMessage() {
        return message;
    }
    public int getId(){
        return id;
    }
}
