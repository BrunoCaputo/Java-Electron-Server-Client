
package electronwebviewtest;

public class ElectronWebViewTest {

    private static Test test;
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                test = new Test();
                test.setVisible(true);
            }
        });
    }
    
}
