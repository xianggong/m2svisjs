<template>
<div id="m2svis-trace-timeline" class="container">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="20" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename" :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
        <el-breadcrumb-item>timeline</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

  <vue-chart chart-type="Timeline" :chart-events="chartEvents" :columns="columns" :rows="rows" :options="options">
  </vue-chart>


</div>
</template>

<script>
export default {
  name: 'm2svis-trace-timeline',
  data: function() {
    return {
      tracename: "",
      chartEvents: {},
      columns: [{
          type: 'string',
          id: 'Role'
        },
        {
          type: 'string',
          id: 'President'
        },
        {
          type: 'number',
          id: 'Start'
        },
        {
          type: 'number',
          id: 'End'
        }
      ],
      rows: [
        ['0', '[0-0]: s_buffer_load_dword s0, s[8:11], 0x00                                                                             ', 1000, 143000],
        ['1', '[0-1]: s_buffer_load_dword s0, s[8:11], 0x00                                                                             ', 1000, 144000],
        ['2', '[0-2]: s_buffer_load_dword s0, s[8:11], 0x00                                                                             ', 1000, 145000],
        ['3', '[0-3]: s_buffer_load_dword s0, s[8:11], 0x00                                                                             ', 1000, 146000],
        ['4', '[0-0]: s_buffer_load_dword s1, s[8:11], 0x04                                                                             ', 10000, 147000],
        ['5', '[0-1]: s_buffer_load_dword s1, s[8:11], 0x04                                                                             ', 14000, 149000],
        ['6', '[0-2]: s_buffer_load_dword s1, s[8:11], 0x04                                                                             ', 19000, 150000],
        ['7', '[0-3]: s_buffer_load_dword s1, s[8:11], 0x04                                                                             ', 23000, 151000],
        ['8', '[0-0]: s_buffer_load_dword s13, s[8:11], 0x08                                                                            ', 27000, 152000],
        ['9', '[0-1]: s_buffer_load_dword s13, s[8:11], 0x08                                                                            ', 32000, 153000],
        ['10', '[0-2]: s_buffer_load_dword s13, s[8:11], 0x08                                                                            ', 36000, 154000],
        ['11', '[0-3]: s_buffer_load_dword s13, s[8:11], 0x08                                                                            ', 40000, 155000],
        ['12', '[0-0]: s_buffer_load_dword s14, s[8:11], 0x0c                                                                            ', 45000, 156000],
        ['13', '[0-1]: s_buffer_load_dword s14, s[8:11], 0x0c                                                                            ', 49000, 157000],
        ['14', '[0-2]: s_buffer_load_dword s14, s[8:11], 0x0c                                                                            ', 53000, 158000],
        ['15', '[0-3]: s_buffer_load_dword s14, s[8:11], 0x0c                                                                            ', 58000, 159000],
        ['16', '[0-0]: s_buffer_load_dword s8, s[8:11], 0x10                                                                             ', 62000, 212000],
        ['17', '[0-1]: s_buffer_load_dword s8, s[8:11], 0x10                                                                             ', 66000, 213000],
        ['18', '[0-2]: s_buffer_load_dword s8, s[8:11], 0x10                                                                             ', 71000, 214000],
        ['19', '[0-3]: s_buffer_load_dword s8, s[8:11], 0x10                                                                             ', 75000, 216000],
        ['20', '[0-0]: s_load_dwordx4 s[16:19], s[2:3], 0x58                                                                             ', 79000, 217000],
        ['21', '[0-1]: s_load_dwordx4 s[16:19], s[2:3], 0x58                                                                             ', 84000, 218000],
        ['22', '[0-2]: s_load_dwordx4 s[16:19], s[2:3], 0x58                                                                             ', 88000, 219000],
        ['23', '[0-3]: s_load_dwordx4 s[16:19], s[2:3], 0x58                                                                             ', 92000, 220000],
        ['24', '[0-0]: s_load_dwordx4 s[20:23], s[2:3], 0x50                                                                             ', 97000, 247000],
        ['25', '[0-1]: s_load_dwordx4 s[20:23], s[2:3], 0x50                                                                             ', 101000, 248000],
        ['26', '[0-2]: s_load_dwordx4 s[20:23], s[2:3], 0x50                                                                             ', 105000, 249000],
        ['27', '[0-3]: s_load_dwordx4 s[20:23], s[2:3], 0x50                                                                             ', 110000, 250000],
        ['28', '[0-0]: s_buffer_load_dword s2, s[4:7], 0x04                                                                              ', 114000, 251000],
        ['29', '[0-1]: s_buffer_load_dword s2, s[4:7], 0x04                                                                              ', 118000, 252000],
        ['30', '[0-2]: s_buffer_load_dword s2, s[4:7], 0x04                                                                              ', 123000, 253000],
        // ['31', '[0-3]: s_buffer_load_dword s2, s[4:7], 0x04                                                                              ', 127000, 254000],
        // ['32', '[0-0]: s_waitcnt lgkmcnt(0)                                                                                              ', 131000, 256000],
        // ['33', '[0-1]: s_waitcnt lgkmcnt(0)                                                                                              ', 136000, 257000],
        // ['34', '[0-2]: s_waitcnt lgkmcnt(0)                                                                                              ', 140000, 258000],
        // ['35', '[0-3]: s_waitcnt lgkmcnt(0)                                                                                              ', 144000, 259000],
        // ['36', '[0-0]: s_min_u32 s2, s2, 0x0000ffff                                                                                      ', 256000, 273000],
        // ['37', '[0-1]: s_min_u32 s2, s2, 0x0000ffff                                                                                      ', 257000, 277000],
        // ['38', '[0-2]: s_min_u32 s2, s2, 0x0000ffff                                                                                      ', 258000, 281000],
        // ['39', '[0-3]: s_min_u32 s2, s2, 0x0000ffff                                                                                      ', 259000, 286000],
        // ['40', '[0-0]: s_mul_i32 s2, s2, s12                                                                                             ', 273000, 290000],
        // ['41', '[0-1]: s_mul_i32 s2, s2, s12                                                                                             ', 277000, 294000],
        // ['42', '[0-2]: s_mul_i32 s2, s2, s12                                                                                             ', 281000, 299000],
        // ['43', '[0-3]: s_mul_i32 s2, s2, s12                                                                                             ', 286000, 303000],
        // ['44', '[0-0]: v_add_i32 v0, vcc, s2, v0                                                                                         ', 290000, 310000],
        // ['45', '[0-1]: v_add_i32 v0, vcc, s2, v0                                                                                         ', 294000, 318000],
        // ['46', '[0-2]: v_add_i32 v0, vcc, s2, v0                                                                                         ', 299000, 327000],
        // ['47', '[0-0]: v_mul_lo_i32 v1, v0, s13                                                                                          ', 302000, 336000],
        // ['48', '[0-3]: v_add_i32 v0, vcc, s2, v0                                                                                         ', 303000, 344000],
        // ['49', '[0-1]: v_mul_lo_i32 v1, v0, s13                                                                                          ', 311000, 353000],
        // ['50', '[0-2]: v_mul_lo_i32 v1, v0, s13                                                                                          ', 319000, 361000],
        // ['51', '[0-0]: v_add_i32 v1, vcc, s14, v1                                                                                        ', 328000, 370000],
        // ['52', '[0-3]: v_mul_lo_i32 v1, v0, s13                                                                                          ', 337000, 379000],
        // ['53', '[0-1]: v_add_i32 v1, vcc, s14, v1                                                                                        ', 345000, 387000],
        // ['54', '[0-2]: v_add_i32 v1, vcc, s14, v1                                                                                        ', 354000, 396000],
        // ['55', '[0-0]: v_lshlrev_b32 v1, 2, v1                                                                                           ', 363000, 405000],
        // ['56', '[0-3]: v_add_i32 v1, vcc, s14, v1                                                                                        ', 371000, 413000],
        // ['57', '[0-1]: v_lshlrev_b32 v1, 2, v1                                                                                           ', 380000, 422000],
        // ['58', '[0-2]: v_lshlrev_b32 v1, 2, v1                                                                                           ', 388000, 431000],
        // ['59', '[0-0]: v_add_i32 v1, vcc, s1, v1                                                                                         ', 397000, 439000],
        // ['60', '[0-3]: v_lshlrev_b32 v1, 2, v1                                                                                           ', 406000, 448000],
        // ['61', '[0-1]: v_add_i32 v1, vcc, s1, v1                                                                                         ', 414000, 457000],
        // ['62', '[0-2]: v_add_i32 v1, vcc, s1, v1                                                                                         ', 423000, 465000],
        // ['63', '[0-0]: tbuffer_load_format_x v1, v1, s[16:19], 0 offen format:[BUF_DATA_FORMAT_32,BUF_NUM_FORMAT_FLOAT]                  ', 432000, 15544000],
        // ['64', '[0-0]: s_waitcnt vmcnt(0)                                                                                                ', 438000, 454000],
        // ['65', '[0-3]: v_add_i32 v1, vcc, s1, v1                                                                                         ', 440000, 474000],
        // ['66', '[0-1]: tbuffer_load_format_x v1, v1, s[16:19], 0 offen format:[BUF_DATA_FORMAT_32,BUF_NUM_FORMAT_FLOAT]                  ', 449000, 16047000],
        // ['67', '[0-1]: s_waitcnt vmcnt(0)                                                                                                ', 456000, 472000],
        // ['68', '[0-2]: tbuffer_load_format_x v1, v1, s[16:19], 0 offen format:[BUF_DATA_FORMAT_32,BUF_NUM_FORMAT_FLOAT]                  ', 458000, 18795000],
        // ['69', '[0-2]: s_waitcnt vmcnt(0)                                                                                                ', 464000, 480000],
        // ['70', '[0-3]: tbuffer_load_format_x v1, v1, s[16:19], 0 offen format:[BUF_DATA_FORMAT_32,BUF_NUM_FORMAT_FLOAT]                  ', 466000, 18828000],
        // ['71', '[0-3]: s_waitcnt vmcnt(0)                                                                                                ', 473000, 489000],
        // ['72', '[0-0]: v_cmp_ge_u32 vcc, s8, v1                                                                                          ', 15544000, 15560000],
        // ['73', '[0-0]: s_and_saveexec_b64 s[2:3], vcc                                                                                    ', 15553000, 15567000],
        // ['74', '[0-0]: s_xor_b64 s[2:3], exec, s[2:3]                                                                                    ', 15567000, 15584000],
        // ['75', '[0-0]: s_cbranch_execz label_0032                                                                                        ', 15584000, 15601000],
        // ['76', '[0-0]: v_add_i32 v1, vcc, 1, v0                                                                                          ', 15601000, 15621000],
        // ['77', '[0-0]: v_mul_lo_i32 v1, v1, s13                                                                                          ', 15613000, 15630000],
        // ['78', '[0-0]: v_add_i32 v1, vcc, s14, v1                                                                                        ', 15622000, 15638000],
        // ['79', '[0-0]: v_lshlrev_b32 v1, 2, v1                                                                                           ', 15631000, 15647000],
        // ['80', '[0-0]: v_add_i32 v1, vcc, s1, v1                                                                                         ', 15639000, 15655000],
        // ['81', '[0-0]: v_add_i32 v1, vcc, -4, v1                                                                                         ', 15648000, 15664000],
        // ['82', '[0-0]: tbuffer_load_format_x v1, v1, s[16:19], 0 offen format:[BUF_DATA_FORMAT_32,BUF_NUM_FORMAT_FLOAT]                  ', 15657000, 19471000],
        // ['83', '[0-0]: s_waitcnt vmcnt(0)                                                                                                ', 15663000, 15679000],
        // ['84', '[0-1]: v_cmp_ge_u32 vcc, s8, v1                                                                                          ', 16047000, 16066000],
        // ['85', '[0-1]: s_and_saveexec_b64 s[2:3], vcc                                                                                    ', 16059000, 16073000],
        // ['86', '[0-1]: s_xor_b64 s[2:3], exec, s[2:3]                                                                                    ', 16073000, 16090000],
        // ['87', '[0-1]: s_cbranch_execz label_004A                                                                                        ', 16090000, 16107000],
        // ['88', '[0-1]: s_or_b64 exec, exec, s[2:3]                                                                                       ', 16107000, 16125000],
        // ['89', '[0-1]: s_endpgm                                                                                                          ', 16125000, 16142000],
        // ['90', '[0-2]: v_cmp_ge_u32 vcc, s8, v1                                                                                          ', 18795000, 18812000],
        // ['91', '[0-2]: s_and_saveexec_b64 s[2:3], vcc                                                                                    ', 18804000, 18818000],
        // ['92', '[0-2]: s_xor_b64 s[2:3], exec, s[2:3]                                                                                    ', 18818000, 18836000],
        // ['93', '[0-3]: v_cmp_ge_u32 vcc, s8, v1                                                                                          ', 18828000, 18847000],
        // ['94', '[0-2]: s_cbranch_execz label_004A                                                                                        ', 18836000, 18853000],
        // ['95', '[0-3]: s_and_saveexec_b64 s[2:3], vcc                                                                                    ', 18839000, 18853000],
        // ['96', '[0-2]: s_or_b64 exec, exec, s[2:3]                                                                                       ', 18853000, 18870000],
        // ['97', '[0-3]: s_xor_b64 s[2:3], exec, s[2:3]                                                                                    ', 18853000, 18875000],
        // ['98', '[0-2]: s_endpgm                                                                                                          ', 18870000, 18888000],
        // ['99', '[0-3]: s_cbranch_execz label_004A                                                                                        ', 18875000, 18892000],
        // ['100', '[0-3]: s_or_b64 exec, exec, s[2:3]                                                                                       ', 18892000, 18909000],
        // ['101', '[0-3]: s_endpgm                                                                                                          ', 18909000, 18927000],
        // ['102', '[0-0]: v_cmp_le_u32 vcc, s8, v1                                                                                          ', 19471000, 19491000],
        // ['103', '[0-0]: s_and_saveexec_b64 s[4:5], vcc                                                                                    ', 19483000, 19497000],
        // ['104', '[0-0]: s_xor_b64 s[4:5], exec, s[4:5]                                                                                    ', 19497000, 19515000],
        // ['105', '[0-0]: v_mov_b32 v1, s0                                                                                                  ', 19515000, 19534000],
        // ['106', '[0-0]: tbuffer_load_format_xyzw v[1:4], v1, s[20:23], 0 offen format:[BUF_DATA_FORMAT_32_32_32_32,BUF_NUM_FORMAT_FLOAT]  ', 19527000, 19954000],
        // ['107', '[0-0]: s_waitcnt vmcnt(0)                                                                                                ', 19533000, 19549000],
        // ['108', '[0-0]: v_mov_b32 v1, v0                                                                                                  ', 19954000, 19971000],
        // ['109', '[0-0]: v_mov_b32 v4, 1                                                                                                   ', 19963000, 19979000],
        // ['110', '[0-0]: v_mov_b32 v0, s0                                                                                                  ', 19972000, 19988000],
        // ['111', '[0-0]: tbuffer_store_format_xyzw v[1:4], v0, s[20:23], 0 offen format:[BUF_DATA_FORMAT_32_32_32_32,BUF_NUM_FORMAT_FLOAT] ', 19981000, 20166000],
        // ['112', '[0-0]: s_waitcnt vmcnt(0) & expcnt(0)                                                                                    ', 19987000, 20003000],
        // ['113', '[0-0]: s_or_b64 exec, exec, s[4:5]                                                                                       ', 20166000, 20181000],
        // ['114', '[0-0]: s_or_b64 exec, exec, s[2:3]                                                                                       ', 20181000, 20198000],
        // ['115', '[0-0]: s_endpgm                                                                                                          ', 20198000, 20215000],
      ],
      options: {
        height: 980,
        // colorByRowLabel: true
      }
    }
  },
  created: function() {
    this.tracename = this.$route.params.tracename;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}

.topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-shrink: 0;
  height: 48px;
  background: #324057;
}

.topbar-logo {
  padding-left: 10px;
  color: white
}

.topbar-main {
  flex: 1;
  flex-flow: column nowrap;
  margin-left: 10px;
}
</style>
