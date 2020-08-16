using System.Collections.Generic;
using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
    [XmlRoot(ElementName = "datatypes")]
    public class Datatypes
    {
        [XmlElement(ElementName = "group")]
        public List<Group> Group { get; set; }
        [XmlAttribute(AttributeName = "db")]
        public string Db { get; set; }
    }
}