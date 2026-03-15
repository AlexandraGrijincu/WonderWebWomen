package dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private int userId;
    private int nivel;

    public LoginResponse(boolean success, String message,int userId,int nivel) {
        this.success = success;
        this.message = message;
        this.userId = userId;
        this.nivel = nivel;
    }
    public boolean isSuccess() {
        return success;
    }
    public String getMessage() {
        return message;
    }
    public int getUserId(){
        return userId;
    }
    public int getNivel() { return nivel; }
}
