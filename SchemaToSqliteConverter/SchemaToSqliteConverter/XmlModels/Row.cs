using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "row")]
    public class Row
    {
        [XmlElement(ElementName = "datatype")]
        public string Datatype { get; set; }
        [XmlElement(ElementName = "default")]
        public string Default { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "null")]
        public string Null { get; set; }
        [XmlAttribute(AttributeName = "autoincrement")]
        public string Autoincrement { get; set; }
        [XmlElement(ElementName = "relation")]
        public Relation Relation { get; set; }
    }
}