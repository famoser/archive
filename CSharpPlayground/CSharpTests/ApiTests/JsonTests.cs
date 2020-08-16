using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Famoser.FrameworkEssentials.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Famoser.CSharpTests.ApiTests
{
    public partial class Transport
    {
        [JsonProperty("content")]
        public Content Content { get; set; }

        [JsonProperty("stations")]
        public Navigation[] Navigations { get; set; }
    }

    public partial class Content
    {
        [JsonProperty("jurisdiction")]
        public string Jurisdiction { get; set; }
    }

    public partial class Navigation
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("category_preview")]
        public CategoryPreview CategoryPreview { get; set; }

        [JsonProperty("cache")]
        public string Cache { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("navigation_type")]
        public string NavigationType { get; set; }

        [JsonProperty("refresh")]
        public string Refresh { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("sub_navigations")]
        public SubNavigation[] SubNavigations { get; set; }
    }

    public partial class CategoryPreview
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("refresh")]
        public string Refresh { get; set; }

        [JsonProperty("cache")]
        public string Cache { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }
    }

    public partial class SubNavigation
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("cache")]
        public string Cache { get; set; }

        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("navigation_type")]
        public string NavigationType { get; set; }

        [JsonProperty("refresh")]
        public string Refresh { get; set; }
    }

    public partial class Transport
    {
        public List<string> GetLocationNames(string json)
        {
            var obj = JsonConvert.DeserializeObject<Transport>(json);

            var result = new List<string>();
            foreach (var objNavigation in obj.Navigations)
            {
                result.Add(objNavigation.Name);
            }
            return result;
        }

        public List<string> GetLocationNames2(string json)
        {
            var obj = JsonConvert.DeserializeObject<Transport>(json);
            return obj.Navigations.Select(objNavigation => objNavigation.Name).ToList();
        }
    }

    [TestClass]
    public class JsonTests
    {
        [TestMethod]
        public async Task TestJsonSerialize()
        {
            var service = new HttpService();
            var resp = await service.DownloadAsync(new Uri("http://transport.opendata.ch/v1/locations?query=Basel"));
            var str = await resp.GetResponseAsStringAsync();
            var trans = new Transport();
            var res = trans.GetLocationNames(str);
            var res2 = trans.GetLocationNames2(str);
        }
    }
}
