using System.Data.SQLite;

namespace DAL {
    public class DAL {
        public static SQLiteConnection Conn;
        public static void ConnectDb () {
            string connectionStr = "Data Source=database.db;Version=3;New=False;Compress=True;";
            Conn = new SQLiteConnection (connectionStr);
            Conn.Open ();
        }
    }
}