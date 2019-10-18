package electronwebviewtest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketServer {

    private ServerSocket socket;
    private OutputStream os = null;
    private Socket client = null;
    private BufferedReader in = null;

    public SocketServer(String ipAddress) throws Exception {
        if (ipAddress != null && !ipAddress.isEmpty()) {
            this.socket = new ServerSocket(Constants.PORT, 1, InetAddress.getByName(ipAddress));
        } else {
            this.socket = new ServerSocket(Constants.PORT, 1, InetAddress.getLocalHost());
        }
    }

    public void listen(Test test) throws Exception {
        String data = null;
        client = this.socket.accept();
        String clientAddress = client.getInetAddress().getHostAddress();
        System.out.println("\r\nNew connection from " + clientAddress);

        in = new BufferedReader(
                new InputStreamReader(client.getInputStream()));
        while ((data = in.readLine()) != null) {
            System.out.println("\r\nMessage from " + clientAddress + ": " + data);
            test.setMessageLblText("Client: " + data);
            if (data.equals("Desconectado")) {
                end();
                data = null;
                test.setOpenBtnEnabled(true);
            }
        }
    }

    public void send(String message) {
        if (client != null) {
            try {
                os = client.getOutputStream();
                byte[] buf = (byte[]) message.getBytes("UTF-8");
                os.write(buf, 0, message.length());
            } catch (IOException ex) {
            }
        } else {
            System.out.println("Socket null");
        }
    }

    public void end() throws IOException {
        if (os != null) {
            os.close();
        }
        if (in != null) {
            in.close();
        }
        if (client != null) {
            client.close();
        }
        if (socket != null) {
            socket.close();
        }
        client = null;
        os = null;
        in = null;
    }

    public InetAddress getSocketAddress() {
        return this.socket.getInetAddress();
    }

    public int getPort() {
        return this.socket.getLocalPort();
    }

    public ServerSocket getSocket() {
        return socket;
    }
}
