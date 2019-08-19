package electronwebviewtest;

import java.io.File;
import java.io.IOException;

public class ButtonsControl {

    private Test test;
    private Process p;

    public ButtonsControl(Test test) {
        this.test = test;
    }

    public void openElectron() {
        File dir = new File("./Electron");
        String cmd = "npm run electron";
        try {
            p = Runtime.getRuntime().exec(cmd, null, dir);
            System.out.println(p);
        } catch (IOException ex) {
        }
    }

    public void socketListen(SocketServer app) {
        try {

            app.listen(test);
        } catch (Exception ex) {
        }
    }

    public void sendMessage(SocketServer app, String message) {
        app.send(message);
    }

    public void endConnection(SocketServer app) {
        File dir = new File("./Electron");
        String cmd = "npm run stop";
        try {
            p = Runtime.getRuntime().exec(cmd, null, dir);
            if (app != null) {
                app.end();
            }
        } catch (IOException ex) {
        }
        test.dispose();
    }
}
