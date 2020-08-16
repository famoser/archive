using System.Collections.Generic;
using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "table")]
    public class Table
    {
        [XmlElement(ElementName = "row")]
        public List<Row> Row { get; set; }
        [XmlElement(ElementName = "key")]
        public Key Key { get; set; }
        [XmlAttribute(AttributeName = "x")]
        public string X { get; set; }
        [XmlAttribute(AttributeName = "y")]
        public string Y { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
    }
}