<template>
  <section class="contactuswidget">
    <b-container>
      <div class="cntc-title">
        <h3>Contact Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <b-form>

        <b-row>
          <b-col>
            <b-form-input
              id="input-1"
              type="text"
              placeholder="First Name"
              v-model="form.first_name"
              required
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-input
              id="input-2"
              type="text"
              placeholder="Last Name"
              v-model="form.last_name"
              required
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-input
              id="input-3"
              type="email"
              placeholder="Work Email"
              v-model="form.work_email"
              required
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-input
              id="input-4"
              type="tel"
              placeholder="Mobile Number"
              v-model="form.mobile"
              required
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-input
              id="input-5"
              type="text"
              placeholder="Job Title"
              v-model="form.title"
              required
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-input
              id="input-6"
              type="text"
              placeholder="Your Industries"
              v-model="form.industry"
              required
            ></b-form-input>
          </b-col>
        </b-row>

         <b-row>
          <b-col>
            <b-form-input
              id="input-7"
              type="text"
              placeholder="Company"
              v-model="form.company"
              required
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-input
              id="input-8"
              type="text"
              placeholder="Country"
              v-model="form.country"
              required
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-textarea
                id="textarea"
                v-model="form.details"
                placeholder="More Details"
                ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted">
                I agree to Telia Carrier Privacy Policy & Cookie notice.
                </b-form-checkbox>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-form-checkbox
                id="checkbox-2"
                v-model="status"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted">
                I would like to receive personalized communications based on my preferences and use of products and services from Telia Carrier via E-mail.
                </b-form-checkbox>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <button type="button" @click="saveInquiry">Send Your Message</button>
            </b-col>
        </b-row>

      </b-form>
    </b-container>
  </section>
</template>
<script>
export default {
  data(){
    return{
      status: false,
      form:{
        first_name:'',
        last_name:'',
        work_email:'',
        mobile:'',
        title:'',
        industry:'',
        country:'',
        details:'',
        company:''
      }
    }
  },
  methods:{
    async saveInquiry(){
      await this.$axios.post('/api/inquiry',this.form).then(e=>{
        this.form = {
          first_name:'',
          last_name:'',
          work_email:'',
          mobile:'',
          title:'',
          industry:'',
          country:'',
          details:'',
          company:''
        }
        this.$toast.success("Inquiry Saved")
      }).catch(e=>{
        var data  = e.response.data
        let err = ''
        for(let q in data){
          err+=data[q]+'</br>'
        }
        this.$toast.error(err)
      })
    }
  }
}
</script>