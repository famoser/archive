using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "relation")]
    public class Relation
    {
        [XmlAttribute(AttributeName = "table")]
        public string Table { get; set; }
        [XmlAttribute(AttributeName = "row")]
        public string Row { get; set; }
    }
}