using System.Data.SQLite;

namespace DAL {
    public class DAL {
        public static SQLiteConnection Conn;
        public static void ConnectDb () {
            string connectionStr = "Data Source=../DAL/database.db;Version=3;FailIfMissing=True";
            Conn = new SQLiteConnection (connectionStr);
            Conn.Open ();
        }
    }
}