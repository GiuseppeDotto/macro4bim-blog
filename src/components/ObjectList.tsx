export default function ObjectList() {
  return (
    <>
      <h2>Object List</h2>
      <div>
        <h3>Button List</h3>
        <button className="btn-primary">btn-primary</button>
        <br />
        <button>normal</button>
        <br />
        <button className="btn-alert">btn-alert</button>
        <h3>Input List</h3>
        <input type="text" placeholder="input" />
        <br />
        <textarea placeholder="textarea"></textarea>
        <br />
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
        <br />
        <label className="label-toggle">
          <input type="checkbox" />
          <div></div>
          label-toggle
        </label>
        <br />
        <h3>Text components</h3>
        <code>in-line code</code>
        <br />
        <q>single line quote</q>
        <br />
        <em>enphasis</em>
        <br />
        <strong>strong</strong>
        <br />
        <blockquote>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum repellat, pariatur
          blanditiis praesentium nostrum tempora facere maxime veniam! Saepe accusamus magni
          veritatis adipisci itaque hic. Libero omnis dolores id, facilis aperiam sed alias sit
          obcaecati consequuntur quam voluptates. Veniam dicta fuga officiis. Magnam quod dolore
          doloremque provident libero tempora ipsum!
        </blockquote>
        <h3>Color Lists</h3>
        <div className="gold">gold text</div>
        <br />
        <div className="acqua">acqua</div>
        <br />
      </div>
    </>
  );
}
