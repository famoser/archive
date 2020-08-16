using System.Collections.Generic;
using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "group")]
    public class Group
    {
        [XmlElement(ElementName = "type")]
        public List<Type> Type { get; set; }
        [XmlAttribute(AttributeName = "color")]
        public string Color { get; set; }
        [XmlAttribute(AttributeName = "label")]
        public string Label { get; set; }
    }
}