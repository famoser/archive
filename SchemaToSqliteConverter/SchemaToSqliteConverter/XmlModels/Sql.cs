using System.Collections.Generic;
using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "sql")]
    public class Sql
    {
        [XmlElement(ElementName = "datatypes")]
        public Datatypes Datatypes { get; set; }
        [XmlElement(ElementName = "table")]
        public List<Table> Table { get; set; }
    }
}