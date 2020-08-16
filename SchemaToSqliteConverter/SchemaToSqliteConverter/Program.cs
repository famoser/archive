using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Xml.Serialization;
using SchemaToSqliteConverter.XmlModels;

namespace SchemaToSqliteConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("path of schema.xml file");
                var path = Console.ReadLine();
                if (string.IsNullOrEmpty(path))
                    path = @"D:\Repos\e_voting\concept\db\schema.xml";
                var folder = Path.GetDirectoryName(path);

                SQLiteConnection.CreateFile(folder + "\\data.db3");

                var allSql = new List<string>();

                using (var mDbConnection = new SQLiteConnection("Data Source=" + folder + "\\data.db3;Version=3;"))
                {
                    mDbConnection.Open();

                    var prepareSql = "PRAGMA foreign_keys=ON;";
                    var prepareCommand = new SQLiteCommand(prepareSql, mDbConnection);
                    prepareCommand.ExecuteNonQuery();
                    allSql.Add(prepareSql);

                    using (var reader = new StreamReader(path))
                    {
                        XmlSerializer serializer = new XmlSerializer(typeof(Sql));
                        Sql content = (Sql)serializer.Deserialize(reader);
                        foreach (var table in content.Table)
                        {
                            var sql = "CREATE TABLE " + table.Name + " (";
                            foreach (var row in table.Row)
                            {
                                sql += row.Name + " " + row.Datatype;
                                if (row.Autoincrement == "1")
                                    sql += " PRIMARY KEY AUTOINCREMENT";
                                if (row.Relation != null)
                                {
                                    sql += " REFERENCES " + row.Relation.Table + "(" + row.Relation.Row + ")";
                                }
                                sql += ",";
                            }

                            sql = sql.Substring(0, sql.Length - 1);
                            sql += ");";

                            var command = new SQLiteCommand(sql, mDbConnection);
                            command.ExecuteNonQuery();
                            allSql.Add(sql);
                        }
                    }
                    mDbConnection.Close();
                }

                File.WriteAllLines(folder + "\\all.sql", allSql);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            Console.ReadKey();
        }
    }
}
