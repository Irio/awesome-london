<template>
  <ClientOnly>
    <div id="british-isles">
      <form action="" id="british-isles-groups">
        <div class="form-group" @mouseover="group = 'BI'">
          <input type="radio" v-model="group" name="group" id="BI" value="BI" />
          <label for="BI">Ilhas Britânicas<br />(British Isles)</label>
        </div>
        <div class="form-group" @mouseover="group = 'UK'">
          <input type="radio" v-model="group" name="group" id="UK" value="UK" />
          <label for="UK">Reino Unido<br />(United Kingdom)</label>
        </div>
        <div class="form-group" @mouseover="group = 'GB'">
          <input type="radio" v-model="group" name="group" id="GB" value="GB" />
          <label for="GB">Grã-Bretanha<br />(Great Britain)</label>
        </div>
        <div class="form-group" @mouseover="group = 'IE'">
          <input type="radio" v-model="group" name="group" id="IE" value="IE" />
          <label for="IE">Ilha da Irlanda<br />(Ireland)</label><br />
        </div>
      </form>
      <svg id="british-isles-map" :class="'only-' + group" />
    </div>
  </ClientOnly>
</template>

<script>
export default {
  data() {
    return {
      group: "BI"
    };
  },

  async mounted() {
    const d3 = await import("d3");
    const topojson = await import("topojson");

    const width = 495,
      height = 300;

    const projection = d3
      .geoAlbers()
      .center([13, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(1200)
      .translate([width / 2, height / 2]);

    const path = d3
      .geoPath()
      .projection(projection)
      .pointRadius(2);

    const svg = d3
      .select("#british-isles-map")
      .attr("width", width)
      .attr("height", height);

    d3.json("/uk.json", function(error, uk) {
      if (error) return console.error(error);

      svg
        .selectAll(".subunit")
        .data(topojson.feature(uk, uk.objects.subunits).features)
        .enter()
        .append("path")
        .attr("class", function(d) {
          return "country " + d.id;
        })
        .attr("d", path);

      const keys = [
        { pt_name: "Inglaterra", name: "England", code: "ENG" },
        { pt_name: "Escócia", name: "Scotland", code: "SCT" },
        { pt_name: "Irlanda", name: "Republic of Ireland", code: "IRL" },
        { pt_name: "País de Gales", name: "Wales", code: "WLS" },
        { pt_name: "Irlanda do Norte", name: "Northern Ireland", code: "NIR" }
      ];

      svg
        .selectAll("namesquares")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cx", 250)
        .attr("cy", function(d, i) {
          return 60 + i * 48;
        })
        .attr("r", 7)
        .attr("class", function(d) {
          return "country " + d.code;
        });

      svg
        .selectAll("ptnames")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 270)
        .attr("y", function(d, i) {
          return 60 + i * 48;
        })
        .attr("class", function(d) {
          return "country " + d.code;
        })
        .text(function(d) {
          return d.pt_name;
        })
        .style("alignment-baseline", "middle");

      svg
        .selectAll("names")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 270)
        .attr("y", function(d, i) {
          return 79 + i * 48;
        })
        .attr("class", function(d) {
          return "country " + d.code;
        })
        .text(function(d) {
          return `(${d.name})`;
        })
        .style("alignment-baseline", "middle");
    });
  }
};
</script>

<style lang="styl">
#british-isles
  align-items: flex-start
  display: flex

#british-isles-groups
  padding: 60px 0
  width: 280px

.form-group
  margin-bottom: 6px

label
  display: inline-block
  line-height: 1.4rem
  vertical-align: top
  white-space: pre-wrap

.country
  fill: rgb(170, 170, 170)

.only-BI,
.only-UK,
.only-GB
  .country.ENG
    fill: rgb(191, 45, 46)

.only-BI,
.only-UK,
.only-GB
  .country.SCT
    fill: rgb(37, 101, 184)

.only-BI,
.only-IE
  .country.IRL
    fill: rgb(241, 142, 80)

.only-BI,
.only-UK,
.only-GB
  .country.WLS
    fill: rgb(74, 168, 73)

.only-BI,
.only-UK,
.only-IE
  .country.NIR
    fill: rgb(3, 29, 101)
</style>
